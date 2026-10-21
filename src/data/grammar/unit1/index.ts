import { GrammarTopicData } from './types';
import { topicPastSimple } from './topic1-past-simple';
import { topicPastContinuous } from './topic2-past-continuous';
import { topicPresentSimple } from './topic3-present-simple';
import { topicAdverbsFrequency } from './topic4-adverbs-frequency';
import { topicPossessivePronouns } from './topic5-possessive-pronouns';
import { topicJoiningSentences } from './topic6-joining-sentences';
import { topicInterests } from './topic7-interests';
import { topicWhQuestions } from './topic8-wh-questions';

export * from './types';
export * from './topic1-past-simple';
export * from './topic2-past-continuous';
export * from './topic3-present-simple';
export * from './topic4-adverbs-frequency';
export * from './topic5-possessive-pronouns';
export * from './topic6-joining-sentences';
export * from './topic7-interests';
export * from './topic8-wh-questions';

export const unit1GrammarTopicsList: GrammarTopicData[] = [
  topicPastSimple,
  topicPastContinuous,
  topicPresentSimple,
  topicAdverbsFrequency,
  topicPossessivePronouns,
  topicJoiningSentences,
  topicInterests,
  topicWhQuestions,
];
