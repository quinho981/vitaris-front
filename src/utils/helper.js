// import { jsPDF } from 'jspdf'
// import html2canvas from 'html2canvas'
// import { useUserStore } from '@/stores/userStore';
// const userStore = useUserStore();

export const useHelpers = () => {
    
    const exportPDF = async (content) => {
        return 'oi'
        // const contentHTML = replaceBackspaceAndCSS(content)
        
        // const div = document.createElement('div')
        // div.innerHTML = `<div class="flex justify-between"><p>Dr(a). ${userStore.username}</p> <p>Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p></div> <br> <hr> <br> ${contentHTML}`
        // div.style.width = '800px'
        // div.style.padding = '50px'
        // div.style.position = 'absolute'
        // div.style.left = '-9999px'
        // div.style.backgroundColor = 'white'
        // document.body.appendChild(div)
        
        // const canvas = await html2canvas(div, {
        //     scale: 2,
        //     useCORS: true,
        //     allowTaint: true
        // })
        // const imgData = canvas.toDataURL('image/png')
        
        // const pdf = new jsPDF('p', 'mm', 'a4')
        // const imgWidth = 210
        // const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        // pdf.save('document.pdf')
        
        // document.body.removeChild(div)
    }

    // const replaceBackspaceAndCSS = (html) => {
    //     html = html.replace(/<p\s*><\/p>/g, '<br>')
    //     html = html.replace(/<p\s*>&nbsp;<\/p>/g, '<br>')
        
    //     html = html.replace(/<ul>/g, '<ul style="margin-left: 20px; margin-bottom: 10px;">')
    //     html = html.replace(/<ol>/g, '<ol style="margin-left: 20px; margin-bottom: 10px;">')
    //     html = html.replace(/<li>/g, '<li style="margin-left: 20px; margin-bottom: 3px;">')
        
    //     return html
    // }

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
    const capitalizeArray = (arr) => {
        if (!arr) return;
        return arr.map(item => capitalizeFirstLetter(item));
    }

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

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const AVATAR_PALETTES = [
    'bg-blue-100 text-blue-800 dark:bg-blue-700/50 dark:text-blue-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-700/50 dark:text-teal-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-700/50 dark:text-purple-200',
    'bg-amber-100 text-amber-800 dark:bg-amber-700/50 dark:text-amber-200',
    'bg-pink-100 text-pink-800 dark:bg-pink-700/50 dark:text-pink-200',
    'bg-green-100 text-green-800 dark:bg-green-700/50 dark:text-green-200',
    'bg-orange-100 text-orange-800 dark:bg-orange-700/50 dark:text-orange-200',
    'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200',
]

    const hashName = (name = '') => {
        let h = 0
        for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff
        return h
    }

    const getInitials = (name = '') =>
        name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()

    const getPatientAvatar = (name = '') =>
        AVATAR_PALETTES[hashName(name) % AVATAR_PALETTES.length]

    return {
        exportPDF,
        formatPtBrCurto,
        convertSecondsToMinutes,
        capitalizeArray,
        formatDate,
        formatSize,
        formatTime,
        getInitials,
        getPatientAvatar
    };
}