export function isValidFaceIdFormat(array: any)
{
    if (!Array.isArray(array))
        return false;

    return array.filter(elem => !Array.isArray(elem)).length === 0;
}
