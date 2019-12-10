class Pagination {
  constructor(page = 1, limit = 20) {
    this.page = Number(page, 10);
    this.limit = Number(limit, 10);
  }

  getQueryMetadata() {
    return { limit: this.limit, offset: this.limit * (this.page - 1) };
  }

  getPageMetaData(totalItems, baseUrl, extraQuery = '') {
    const { page, limit } = this;

    const totalPages = Math.ceil(totalItems / limit);
    const prev = page > 1 ? `${baseUrl}?${extraQuery}page=${page - 1}&limit=${limit}` : null;
    const currentPage = page;
    const next = page < totalPages ? `${baseUrl}?${extraQuery}page=${page + 1}&limit=${limit}` : null;

    return {
      prev,
      currentPage,
      next,
      totalPages,
      totalItems,
    };
  }
}

export default Pagination;
