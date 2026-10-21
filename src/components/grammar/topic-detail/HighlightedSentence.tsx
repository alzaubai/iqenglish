import React from 'react';

interface HighlightedSentenceProps {
  sentence: string;
  highlight?: string;
  colorClass?: string;
}

export const HighlightedSentence: React.FC<HighlightedSentenceProps> = ({
  sentence,
  highlight,
  colorClass = 'text-blue-600 font-black underline decoration-blue-400 decoration-2',
}) => {
  if (!highlight) return <>{sentence}</>;
  const parts = sentence.split(highlight);
  if (parts.length === 1) return <>{sentence}</>;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className={colorClass}>{highlight}</span>}
        </React.Fragment>
      ))}
    </>
  );
};
