export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s+/).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}
