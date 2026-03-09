import { http } from './http';

export type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name?: string | null;
    email: string;
  };
};

type CommentsResponse = {
  items: CommentItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type CreateCommentPayload = {
  content: string;
  taskId: string;
};

export async function getCommentsByTask(taskId: string) {
  const { data } = await http.get<CommentsResponse>(
    `/comments?taskId=${taskId}&page=1&limit=50`,
  );
  return data;
}

export async function createComment(payload: CreateCommentPayload) {
  const { data } = await http.post('/comments', payload);
  return data;
}