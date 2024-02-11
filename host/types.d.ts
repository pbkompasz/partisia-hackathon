
type RequestOptions = {
  isUrgent?: boolean
  loggingLevel?: 'normal' | 'high'
  isFragile?: boolean
  takePhotos?: boolean
}

type PackageInfo = {
  minimumWeight: number
}

export {
  RequestOptions,
}
