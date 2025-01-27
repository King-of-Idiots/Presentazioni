        // Galleria orizzontale
        document.addEventListener("DOMContentLoaded", () => {
            const galleryImages = document.querySelectorAll('.gallery-image');
            const galleryImagesimg2 = document.querySelectorAll('.gallery-imageimg2');
            const fixedImage = document.querySelectorAll('.fixed-image');
            const fixedImg = document.getElementById('fixed-image');
            const autori = document.querySelectorAll('.textautori');
            const galleryWrapper = document.querySelector('.gallery-wrapper');
            const gallery = document.querySelector('.gallery');
            const totalImages = galleryImages.length;
            const testo1 = document.getElementById('testo1-1');
            const testo2 = document.getElementById('testo1-2');
            const testo3 = document.getElementById('testo1-3');
            const testo4 = document.getElementById('testo1-4');
            const testo5 = document.getElementById('testo1-5');

            function updateGallery(scrollPercent) {
                const totalWidth = gallery.scrollWidth;
                const viewWidth = window.innerWidth;
                const maxScroll = totalWidth - viewWidth;
            
                let centeredIndex = Math.floor(scrollPercent * totalImages);
                if (centeredIndex >= totalImages) {
                    centeredIndex = totalImages - 1;
                }
            
                const centeredImage = galleryImages[centeredIndex];
                const centeredImageOffset = centeredImage.offsetLeft + (centeredImage.offsetWidth / 2);
                const scrollX = 1600 + centeredImageOffset - (viewWidth / 2);
            
                gallery.style.transform = `translateX(${-scrollX}px)`;
            
                galleryImages.forEach((img, index) => {
                    img.classList.remove('active', 'next');
            
                    if (index === centeredIndex) {
                        img.classList.add('active');
                        testo1.style.opacity = index === 0 ? 1 : 0;
                        testo2.style.opacity = index === 1 ? 1 : 0;
                        testo3.style.opacity = index === 2 ? 1 : 0;
                        testo4.style.opacity = index === 3 ? 1 : 0;
                        testo5.style.opacity = index === 4 ? 1 : 0;
                    } else if (index === (centeredIndex + 1) % totalImages) {
                        img.classList.add('next');
                    }
                });
            }

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY - 500;
                const scrollMax = document.body.scrollHeight - window.innerHeight;
                const scrollThreshold = scrollMax / 5;

                const scrollPercent = scrollY / scrollThreshold;

                if (scrollY > 0 && scrollY < 3500) { // Adjusted to stop animation before reaching the 5th image
                    updateGallery(scrollPercent);
                }

                galleryImages.forEach((img) => {
                    if (scrollY <= scrollThreshold) {
                        img.style.opacity = 1;
                    } else {
                        img.style.opacity = 1 - (scrollY / scrollThreshold);
                    }
                });

                fixedImage.forEach((img) => {
                    if (scrollY <= scrollThreshold) {
                        img.style.opacity = 1;
                    } else {
                        img.style.opacity = 1 - (scrollY / scrollThreshold);
                    }
                });

                autori.forEach((text) => {
                    if (scrollY <= scrollThreshold) {
                        text.style.opacity = 1;
                    } else {
                        text.style.opacity = 1 - (scrollY / scrollThreshold);
                    }
                });

                // Show gallery wrapper after 500px scroll
                if (scrollY > 0 && scrollY < 3500) {
                    galleryWrapper.style.opacity = 1;
                } else {
                    galleryWrapper.style.opacity = 0;
                }

                //hide testo1-5 after a certain scroll threshold
                if (scrollY > 800) {
                    // gradually decrease opacity
                    testo5.style.opacity = 1 - (scrollY - 800) / 100;
                } else if (scrollY > 654) {
                    testo5.style.opacity = 1;
                } else {
                    testo5.style.opacity = 0;
                }

                // Hide fixed image after a certain scroll threshold
                fixedImage.forEach((img) => {
                    if (scrollY > 3000) {
                        img.style.opacity = 0;
                        fixedImage.style.opacity = 0;
                    } else if (scrollY > 0) {
                        img.style.opacity = 1;
                        fixedImage.style.opacity = 1;
                    } else {
                        img.style.opacity = 0;
                        fixedImage.style.opacity = 0;
                    }
                });
            });
        });

        // Funzione per l'animazione dell'immagine 2

        // Galleria frontale
        function updateImage(scrollPosition, img, startScroll, endScroll) {
            if (scrollPosition >= startScroll && scrollPosition < endScroll) {
                img.style.transform = 'translate(-50%, -50%) scale(2.5)';
                img.style.opacity = '1';
            } else if (scrollPosition >= endScroll) {
                img.style.transform = 'translate(-50%, -50%) scale(6)';
                img.style.opacity = '0';
            } else {
                img.style.transform = 'translate(-50%, -50%) scale(0)';
                img.style.opacity = '0';
            }

            // sposta l'immagine 5 per evitare che vengano coperti i link
            if (window.scrollY > 3300) {
                document.getElementById('img5-container').style.right = 1000px;
            }

        }

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            updateImage(scrollPosition, document.getElementById('img2-container'), 1800, 2300);
            updateImage(scrollPosition, document.getElementById('img3-container'), 2800, 3300);
        });

        // Chiama le funzioni all'inizio per aggiornare la posizione iniziale
        updateImage(scrollPosition, document.getElementById('img2-container'), 1800, 2300);
        updateImage(scrollPosition, document.getElementById('img3-container'), 2800, 3300);
