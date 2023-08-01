export const getImageUrl = (path: string) => {
    if (!path) {
        return '/no-image.png';
    }
    return path.startsWith('storage') ? `${process.env.NEXT_PUBLIC_URL_DEFAULT}${path}` : path;
}