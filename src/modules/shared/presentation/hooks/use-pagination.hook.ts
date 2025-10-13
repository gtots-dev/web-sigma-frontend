interface UsePaginationOptions {
  currentPage: number
  perPage: number
  total: number
  maxPagesToShow?: number
}

export function usePagination({
  currentPage,
  perPage,
  total,
  maxPagesToShow = 5
}: UsePaginationOptions) {
  const totalPages = Math.ceil(total / perPage)

  const half = Math.floor(maxPagesToShow / 2)
  let start = Math.max(currentPage - half, 1)
  const end = Math.min(start + maxPagesToShow - 1, totalPages)

  if (end - start + 1 < maxPagesToShow) {
    start = Math.max(end - maxPagesToShow + 1, 1)
  }

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return {
    currentPage,
    totalPages,
    range,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages
  }
}
