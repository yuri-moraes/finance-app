export default function formatDate(isoDate) {
    if (!isoDate) return '';
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj)) return isoDate; 
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  