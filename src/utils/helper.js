import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();

export const useHelpers = () => {
    
    const exportPDF = async (content) => {
        const contentHTML = replaceBackspaceAndCSS(content)
        
        const div = document.createElement('div')
        div.innerHTML = `<div class="flex justify-between"><p>Dr(a). ${userStore.username}</p> <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p></div> <br> <hr> <br> ${contentHTML}`
        div.style.width = '800px'
        div.style.padding = '50px'
        div.style.position = 'absolute'
        div.style.left = '-9999px'
        div.style.backgroundColor = 'white'
        document.body.appendChild(div)
        
        const canvas = await html2canvas(div, {
            scale: 2,
            useCORS: true,
            allowTaint: true
        })
        const imgData = canvas.toDataURL('image/png')
        
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save('document.pdf')
        
        document.body.removeChild(div)
    }

    const replaceBackspaceAndCSS = (html) => {
        html = html.replace(/<p\s*><\/p>/g, '<br>')
        html = html.replace(/<p\s*>&nbsp;<\/p>/g, '<br>')
        
        html = html.replace(/<ul>/g, '<ul style="margin-left: 20px; margin-bottom: 10px;">')
        html = html.replace(/<ol>/g, '<ol style="margin-left: 20px; margin-bottom: 10px;">')
        html = html.replace(/<li>/g, '<li style="margin-left: 20px; margin-bottom: 3px;">')
        
        return html
    }

    function formatPtBrCurto(iso) {
        const d = new Date(iso);
        const day = String(d.getUTCDate()).padStart(2, '0');
        let month = new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' }).format(d);
        month = month.replace('.', '');
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const year = d.getUTCFullYear();
        return `${day} de ${month}, ${year}`;
    }

    const convertSecondsToMinutes = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        if (mins === 0) {
            return `${secs}s`;
        }
        if (secs === 0) {
            return `${mins}min`;
        }
        return `${mins}min ${secs}s`;
    };

    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    const capitalizeArray = (arr) => arr.map(item => capitalizeFirstLetter(item));

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const formatSize = (size) => {
        if (!size) return '';
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    return {
        exportPDF,
        formatPtBrCurto,
        convertSecondsToMinutes,
        capitalizeArray,
        formatDate,
        formatSize,
    };
}