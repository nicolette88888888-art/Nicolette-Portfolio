// Utility to map project folders to their media files
const PROJECT_FILES_BASE = '/Project files'

function encodeFilePath(path: string): string {
  return path.split('/').map(segment => {
    if (!segment) return segment
    return encodeURIComponent(segment)
  }).join('/')
}

const RAW_PROJECT_FILES: Record<number, {
  videos: string[]
  images: string[]
}> = {
  1: {
    videos: [
      `${PROJECT_FILES_BASE}/1/copy_4755A111-7A7A-4CB9-A3F0-E144A997FC17 2.MOV`,
      `${PROJECT_FILES_BASE}/1/copy_9B07A1C8-472B-4EB8-95BC-F7E19FD10471 2.MOV`,
    ],
    images: [
      `${PROJECT_FILES_BASE}/1/1.png`,
      `${PROJECT_FILES_BASE}/1/Uganda Oct Flyer -nicolette.png`,
    ],
  },
  2: {
    videos: [
      `${PROJECT_FILES_BASE}/2/export_1689436621341.mov`,
    ],
    images: [
      `${PROJECT_FILES_BASE}/2/IMG_2508.PNG`,
      `${PROJECT_FILES_BASE}/2/Screenshot 2025-11-12 at 2.04.02 PM.png`,
    ],
  },
  3: {
    videos: [],
    images: [],
  },
  4: {
    videos: [],
    images: [],
  },
}

export const PROJECT_FILES: Record<number, {
  videos: string[]
  images: string[]
}> = Object.fromEntries(
  Object.entries(RAW_PROJECT_FILES).map(([key, value]) => [
    key,
    {
      videos: value.videos.map(encodeFilePath),
      images: value.images.map(encodeFilePath),
    },
  ])
) as Record<number, { videos: string[]; images: string[] }>

export function getProjectFiles(projectNumber: number): {
  videos: string[]
  images: string[]
} {
  return PROJECT_FILES[projectNumber] || { videos: [], images: [] }
}

export function getPrimaryVideo(projectNumber: number): string | null {
  const files = getProjectFiles(projectNumber)
  return files.videos.length > 0 ? files.videos[0] : null
}

export function getProjectImages(projectNumber: number): string[] {
  const files = getProjectFiles(projectNumber)
  return files.images
}

export function getAdditionalVideos(projectNumber: number): string[] {
  const files = getProjectFiles(projectNumber)
  return files.videos.slice(1)
}
