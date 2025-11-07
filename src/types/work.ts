export type WorkData = {
  _id: string;
  name: string;
  sub: string;
  link: string;
  type: string[];
  src: string;
  category: string;
};

export type WorkListProps = {
  workData: WorkData[];
  useFilter: boolean;
};

export type WorkCardProps = {
  workData: WorkData;
  index: number;
};
