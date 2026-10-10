export function parseExtensionListParams(params: URLSearchParams) {
  const sort = params.get("sort");
  return {
    page: Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1),
    limit: Math.min(
      100,
      Math.max(1, Number.parseInt(params.get("limit") ?? "20", 10) || 20),
    ),
    sort:
      sort === "stars" || sort === "updated" || sort === "installs"
        ? sort
        : "installs",
    order: params.get("order") === "asc" ? "asc" : "desc",
    q: params.get("q")?.trim() ?? "",
    view: params.get("view") === "summary" ? "summary" : "full",
  } as const;
}
