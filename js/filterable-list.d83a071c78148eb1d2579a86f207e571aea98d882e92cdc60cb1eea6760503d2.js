document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-filter-list]").forEach((root) => {
    const items = Array.from(root.querySelectorAll("[data-filter-item]"));
    const search = root.querySelector("[data-filter-search]");
    const selects = Array.from(root.querySelectorAll("[data-filter-select]"));

    const empty = root.querySelector("[data-filter-empty]");
    const pagination = root.querySelector("[data-filter-pagination]");
    const prev = root.querySelector("[data-filter-prev]");
    const next = root.querySelector("[data-filter-next]");
    const info = root.querySelector("[data-filter-info]");

    const perPage = Number.parseInt(root.dataset.perPage || "9", 10);

    let currentPage = 1;
    let filteredItems = [...items];

    const normalize = (value) => {
      return String(value || "").trim().toLowerCase();
    };

    const getTokens = (item, key) => {
      const raw = item.getAttribute(`data-${key}`) || "";

      if (raw.includes("|")) {
        return raw.split("|").map(normalize).filter(Boolean);
      }

      return normalize(raw).split(/\s+/).filter(Boolean);
    };

    const itemMatches = (item) => {
      const query = search ? normalize(search.value) : "";
      const searchableText = normalize(item.dataset.search || item.textContent);

      const matchesSearch = !query || searchableText.includes(query);

      const matchesSelects = selects.every((select) => {
        const value = normalize(select.value);

        if (!value || value === "all") {
          return true;
        }

        const key = select.dataset.filterSelect;
        const tokens = getTokens(item, key);

        return tokens.includes(value);
      });

      return matchesSearch && matchesSelects;
    };

    const render = () => {
      const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));

      if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      const start = (currentPage - 1) * perPage;
      const visibleItems = new Set(filteredItems.slice(start, start + perPage));

      items.forEach((item) => {
        item.hidden = !visibleItems.has(item);
      });

      if (info) {
        info.textContent = filteredItems.length
          ? `${currentPage} de ${totalPages}`
          : "0 de 0";
      }

      if (prev) {
        prev.disabled = currentPage === 1 || !filteredItems.length;
      }

      if (next) {
        next.disabled = currentPage === totalPages || !filteredItems.length;
      }

      if (empty) {
        empty.hidden = Boolean(filteredItems.length);
      }

      if (pagination) {
        pagination.hidden = totalPages <= 1 && Boolean(filteredItems.length);
      }
    };

    const applyFilters = () => {
      filteredItems = items.filter(itemMatches);
      currentPage = 1;
      render();
    };

    if (search) {
      search.addEventListener("input", applyFilters);
    }

    selects.forEach((select) => {
      select.addEventListener("change", applyFilters);
    });

    if (prev) {
      prev.addEventListener("click", () => {
        if (currentPage <= 1) return;
        currentPage -= 1;
        render();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));
        if (currentPage >= totalPages) return;

        currentPage += 1;
        render();
      });
    }

    render();
  });
});
