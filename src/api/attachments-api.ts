import { http } from './http';

export type Attachment = {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export async function getTaskAttachments(taskId: string) {
  const { data } = await http.get<Attachment[]>(`/tasks/${taskId}/attachments`);
  return data;
}

export async function uploadTaskAttachment(taskId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await http.post(`/tasks/${taskId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function deleteAttachment(attachmentId: string) {
  const { data } = await http.delete(`/attachments/${attachmentId}`);
  return data;
}