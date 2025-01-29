export const customFile = () => {
    document.querySelectorAll('.custom-file-input').forEach(input => {
        input.addEventListener('change', function () {
            if (this.files.length > 0) {
                let fileName = this.files.length > 1 ? this.files.length + ' files selected' : this.files[0].name;

                // Обрезаем имя файла до 5 символов до точки
                const dotIndex = fileName.lastIndexOf('.');
                if (dotIndex > 20) {
                    fileName = fileName.substring(0, 20) + fileName.substring(dotIndex);
                }

                // Находим span внутри .custom-file-label, связанного с этим input
                const fileLabel = this.closest('.custom-file').querySelector('.custom-file-label span');
                if (!fileLabel) return;

                fileLabel.textContent = fileName;
            }
        });
    });
}
