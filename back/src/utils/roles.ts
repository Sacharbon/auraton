import User from "@models/user";

export function isValidRolesFormat(roles: any)
{
    if (!Array.isArray(roles))
        return false;

    return roles.filter(elem => typeof elem !== "string").length === 0;
}

function resetUserRoles(user: User)
{
    user.roles = user.roles.filter(role => !["Roi", "Seigneur", "Baron", "Chevalier", "Écuyer"].includes(role));
}

// Cette fonction est affreusement moche mais on avait une semaine et c'est qu'un poc
export async function updateUserRole(user: User, allUsers: User[])
{
    const sortedUsers = allUsers
        .filter(user => user.aura >= 10_000_000)
        .sort((user1, user2) => user2.aura - user1.aura);

    // Haha quelle belle forêt de if ;-;
    if (user.aura >= 10_000_000) {
        resetUserRoles(user);
        user.roles = user.roles.concat(["Seigneur"]);
    } else if (user.aura >= 100_000) {
        resetUserRoles(user);
        user.roles = user.roles.concat(["Baron"]);
    } else if (user.aura >= 1_000) {
        resetUserRoles(user);
        user.roles = user.roles.concat(["Chevalier"]);
    } else if (user.aura < 1_000) {
        resetUserRoles(user);
        user.roles = user.roles.concat(["Écuyer"]);
    }

    if (sortedUsers.length < 0)
        return;

    sortedUsers.map((user, rank) => {
        if (user.roles.includes("Roi")) {
            resetUserRoles(user);
            user.roles = user.roles.concat(["Seigneur"]);
        }

        switch (rank) {
            case 0:
                resetUserRoles(user);
                user.roles = user.roles.concat(["Roi"]);
                break;
            default:
                break;
        }
    });

    for (let user of sortedUsers)
        await user.save();
    await user.save();
}
