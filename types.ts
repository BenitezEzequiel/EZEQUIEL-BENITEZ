
export interface TestCase {
  id: number;
  type: 'Positive' | 'Negative';
  description: string;
  steps: string;
  expectedResult: string;
}

export interface BugReport {
  title: string;
  environment: string;
  stepsToReproduce: string;
  actualResult: string;
  expectedResult: string;
}

export interface GeneratedAssets {
  pythonScript: string;
  testCases: TestCase[];
  bugReport: BugReport;
}
