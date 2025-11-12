// Utility to map project folders to their media files
// This maps the numbered folders in public/Project files/ to project pages

const PROJECT_FILES_BASE = '/Project files'

// Helper to encode file paths for URLs (handles spaces and special characters)
// For Next.js public folder, we can use the path directly or encode it
function encodeFilePath(path: string): string {
  // Encode each segment separately to handle spaces in folder/file names
  return path.split('/').map(segment => {
    // Don't encode empty segments (leading/trailing slashes)
    if (!segment) return segment
    return encodeURIComponent(segment)
  }).join('/')
}

// Helper to get file extension
function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

// Check if file is a video
function isVideoFile(filename: string): boolean {
  const videoExtensions = ['mov', 'mp4', 'avi', 'webm', 'mkv', 'm4v']
  return videoExtensions.includes(getFileExtension(filename))
}

// Check if file is an image
function isImageFile(filename: string): boolean {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
  return imageExtensions.includes(getFileExtension(filename))
}

// Project files mapping - manually defined based on folder structure
// File paths are encoded to handle spaces and special characters
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

// Encode all file paths
// For images, try both encoded and unencoded to handle Next.js public folder access
export const PROJECT_FILES: Record<number, {
  videos: string[]
  images: string[]
}> = Object.fromEntries(
  Object.entries(RAW_PROJECT_FILES).map(([key, value]) => [
    key,
    {
      videos: value.videos.map(encodeFilePath),
      // For images, use encoded path but we'll try unencoded as fallback in the component
      images: value.images.map(encodeFilePath),
    },
  ])
) as Record<number, { videos: string[]; images: string[] }>

// Get project files by project number
export function getProjectFiles(projectNumber: number): {
  videos: string[]
  images: string[]
} {
  return PROJECT_FILES[projectNumber] || { videos: [], images: [] }
}

// Get primary video (first video) for a project
export function getPrimaryVideo(projectNumber: number): string | null {
  const files = getProjectFiles(projectNumber)
  return files.videos.length > 0 ? files.videos[0] : null
}

// Get all images for a project
export function getProjectImages(projectNumber: number): string[] {
  const files = getProjectFiles(projectNumber)
  return files.images
}

// Get additional videos (all videos except the first one)
export function getAdditionalVideos(projectNumber: number): string[] {
  const files = getProjectFiles(projectNumber)
  return files.videos.slice(1) // Return all videos except the first one
}

