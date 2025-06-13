import {create } from 'zustand'

type DubProject = {
    id: string,
    projectTitle: string,
    sourceLanguage: string,
    targetLanguage: string,
    uploadedFile: File | null,
    status: 'processing' | 'complete'
}

type DubStore = {
    projects: DubProject[];
    addProject: (project: DubProject) => void;
}


export const useDubStore = create<DubStore>((set)=> ({
    projects: [],
    addProject: (project) => set((state) => ({projects: [...state.projects, project]}))
}))