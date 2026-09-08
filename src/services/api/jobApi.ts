import { apiClient } from '../../lib/api/client';
import type { ApiJob, ApiJobListResponse, ApiJobSearchParams, ApiJobCreate, ApiJobUpdate, ApiJobMatchResult } from '../../types/api';

function buildQueryString(params: ApiJobSearchParams): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) { value.forEach((v) => searchParams.append(key, String(v))); }
    else { searchParams.set(key, String(value)); }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export const jobApi = {
  listJobs: async (params: ApiJobSearchParams = {}): Promise<ApiJobListResponse> => {
    const qs = buildQueryString(params);
    return apiClient<ApiJobListResponse>(`/jobs${qs}`);
  },
  getJob: async (jobId: string): Promise<ApiJob> => { return apiClient<ApiJob>(`/jobs/${jobId}`); },
  createJob: async (data: ApiJobCreate): Promise<ApiJob> => { return apiClient<ApiJob>('/jobs', { data }); },
  updateJob: async (jobId: string, data: ApiJobUpdate): Promise<ApiJob> => { return apiClient<ApiJob>(`/jobs/${jobId}`, { method: 'PUT', data }); },
  patchJob: async (jobId: string, data: ApiJobUpdate): Promise<ApiJob> => { return apiClient<ApiJob>(`/jobs/${jobId}`, { method: 'PATCH', data }); },
  deleteJob: async (jobId: string): Promise<ApiJob> => { return apiClient<ApiJob>(`/jobs/${jobId}`, { method: 'DELETE' }); },
  getJobMatch: async (jobId: string, resumeId: string): Promise<ApiJobMatchResult> => { return apiClient<ApiJobMatchResult>(`/jobs/${jobId}/match?resume_id=${resumeId}`); },
};
