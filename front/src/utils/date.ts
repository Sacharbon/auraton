const month = [
    "Janv.",
    "Fév.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
]

export function formatStringDate(date: string) : string
{
    const dateObj = new Date(date);

    const y = dateObj.getFullYear();
    const m = dateObj.getMonth();
    const d = dateObj.getDay();
    return `${d.toString().padStart(2, '0')} ${month[m]} ${y.toString().padStart(4, '0')}`;
}
