export type HistoryDetail = {
  date: string;
  text: string;
};

export type HistorySection = {
  _id: string;
  icon: string;
  title: string;
  list: HistoryDetail[];
};

export type HistoryListProps = {
  history: HistorySection[];
};

export type HistoryBoxProps = {
  sectionData: HistorySection;
};
