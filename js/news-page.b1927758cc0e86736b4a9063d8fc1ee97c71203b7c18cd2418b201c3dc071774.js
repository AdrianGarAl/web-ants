document.addEventListener("DOMContentLoaded", () => {
  const blocks = Array.from(document.querySelectorAll(".news-block")).filter((block) =>
    block.querySelector(":scope > .news-inline-image")
  );

  if (!blocks.length) return;

  const stackedClass = "news-block--is-stacked";
  const singleColumnQuery = window.matchMedia("(max-width: 620px)");
  const blockState = new WeakMap();

  const getImage = (block) => block.querySelector(":scope > .news-inline-image");

  const getState = (block) => {
    const currentState = blockState.get(block);

    if (currentState) return currentState;

    const image = getImage(block);

    if (!image) return null;

    const marker = document.createComment("news-image-original-position");
    block.insertBefore(marker, image);

    const state = { image, marker };
    blockState.set(block, state);

    return state;
  };

  const restoreOriginalImagePosition = (state) => {
    const { image, marker } = state;

    if (marker.nextSibling === image) return;

    marker.parentNode.insertBefore(image, marker.nextSibling);
  };

  const getStackPosition = (image) => {
    const value = image.dataset.newsStackPosition;

    if (!value || value === "end" || value === "last") return Infinity;

    const position = Number.parseInt(value, 10);

    return Number.isFinite(position) && position > 0 ? position : Infinity;
  };

  const placeImageForStack = (block, state) => {
    const { image } = state;
    const position = getStackPosition(image);
    const contentItems = Array.from(block.children).filter((child) => child !== image);

    if (!contentItems.length || position > contentItems.length) {
      block.appendChild(image);
      return;
    }

    block.insertBefore(image, contentItems[position - 1]);
  };

  const getTextHeight = (block, image) => {
    const contentItems = Array.from(block.children).filter((child) => child !== image);

    if (!contentItems.length) return 0;

    const bounds = contentItems.reduce(
      (range, child) => {
        const rect = child.getBoundingClientRect();

        return {
          top: Math.min(range.top, rect.top),
          bottom: Math.max(range.bottom, rect.bottom),
        };
      },
      { top: Infinity, bottom: -Infinity }
    );

    return Math.max(0, bounds.bottom - bounds.top);
  };

  const updateBlock = (block) => {
    const state = getState(block);

    if (!state) return;

    const { image } = state;

    block.classList.remove(stackedClass);

    if (singleColumnQuery.matches) {
      placeImageForStack(block, state);
      block.classList.add(stackedClass);
      return;
    }

    restoreOriginalImagePosition(state);

    if (!block.classList.contains("news-block--fit-image")) return;

    const imageHeight = image.getBoundingClientRect().height;
    const textHeight = getTextHeight(block, image);

    if (textHeight > imageHeight) {
      placeImageForStack(block, state);
      block.classList.add(stackedClass);
    }
  };

  const updateBlocks = () => {
    blocks.forEach(updateBlock);
  };

  const resizeObserver = new ResizeObserver(updateBlocks);

  blocks.forEach((block) => {
    getState(block);
    resizeObserver.observe(block);

    block.querySelectorAll("img").forEach((image) => {
      image.addEventListener("load", updateBlocks, { once: true });
    });
  });

  window.addEventListener("resize", updateBlocks);
  singleColumnQuery.addEventListener("change", updateBlocks);
  updateBlocks();
});
