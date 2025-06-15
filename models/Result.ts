export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: { code: number; message: string } };