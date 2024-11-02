import { Meta } from "../../Meta";

export interface LearningPathData {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface LearningPathResponse {
  data: LearningPathData[];
  meta: Meta;
}
