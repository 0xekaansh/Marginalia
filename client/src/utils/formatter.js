export function formatAuthors(author) {
  if (!author) return "Unknown Author";
  return Array.isArray(author) ? author.join(" and ") : author;
}
