type Collection = {
  items: [{ question: string; answer: string }];
};

type MainEntity = {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
};
export function getMainEntityFromCollection(
  collection: Collection,
): MainEntity[] {
  let result: MainEntity[] = [];

  collection.items.forEach((qa) => {
    result.push({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    });
  });

  return result;
}
