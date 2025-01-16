export function isValidRolesFormat(roles: any)
{
    if (!Array.isArray(roles))
        return false;

    return roles.filter(elem => typeof elem !== "string").length === 0;
}
