document.addEventListener('DOMContentLoaded', () => {
    // كود تأثير التوهج في Hero Section
    const heroSection = document.querySelector('.hero-section');
    const mediaQueryMD = window.matchMedia('(min-width: 768px)'); // تعريف نقطة التوقف لـ MD (768 بكسل وما فوق)

    if (heroSection) {
        // فحص أولي عند تحميل الصفحة: أخفي الوميض إذا كانت الشاشة بحجم الهاتف
        if (!mediaQueryMD.matches) {
            heroSection.style.setProperty('--glow-opacity', '0');
            heroSection.style.setProperty('--glow-scale', '0');
        }

        const applyGlowEffect = (e) => {
            // تطبيق الوميض فقط إذا كانت الشاشة أكبر من أو تساوي 768 بكسل (شاشات الحاسوب)
            if (mediaQueryMD.matches) {
                const rect = heroSection.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                heroSection.style.setProperty('--glow-x', `${mouseX}px`);
                heroSection.style.setProperty('--glow-y', `${mouseY}px`);
                heroSection.style.setProperty('--glow-opacity', '1');
                heroSection.style.setProperty('--glow-scale', '1');
            } else {
                // إخفاء الوميض بشكل صريح على شاشات الهاتف
                heroSection.style.setProperty('--glow-opacity', '0');
                heroSection.style.setProperty('--glow-scale', '0');
            }
        };

        const hideGlowEffect = () => {
            // إخفاء الوميض عند مغادرة الفأرة (للحاسوب) أو دائماً على الهاتف
            // هذه الدالة ستعمل دائماً، ولكن الشروط في applyGlowEffect و mediaQueryMD.addEventListener ستضمن عدم ظهوره على الهاتف
            heroSection.style.setProperty('--glow-opacity', '0');
            heroSection.style.setProperty('--glow-scale', '0');
        };

        heroSection.addEventListener('mousemove', applyGlowEffect);
        heroSection.addEventListener('mouseleave', hideGlowEffect);

        // معالجة تغيير حجم الشاشة ديناميكيًا (إذا قام المستخدم بتغيير حجم النافذة)
        mediaQueryMD.addEventListener('change', (e) => {
            if (!e.matches) { // إذا أصبحت الشاشة بحجم الهاتف
                hideGlowEffect(); // أخفي الوميض فورًا
            } else { // إذا أصبحت الشاشة بحجم الحاسوب
                // إعادة ضبط الوميض إلى الحالة المخفية، وسيظهر عند حركة الفأرة
                heroSection.style.setProperty('--glow-opacity', '0');
                heroSection.style.setProperty('--glow-scale', '0');
            }
        });
    }

    // كود Accordion لقائمة التنقل (بدون تغيير)
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // إغلاق كل قوائم Accordion الأخرى المفتوحة
            accordionButtons.forEach(otherButton => {
                const otherItem = otherButton.closest('.accordion-item');
                const otherContent = otherItem.querySelector('.accordion-content');
                if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherContent.classList.remove('active');
                }
            });

            // تبديل حالة Accordion الحالي
            if (isExpanded) {
                button.setAttribute('aria-expanded', 'true');
                accordionContent.classList.add('active');
            } else {
                button.setAttribute('aria-expanded', 'false');
                accordionContent.classList.remove('active');
            }
        });
    });

    // إغلاق قوائم Accordion عند النقر خارجها
    document.addEventListener('click', (event) => {
        accordionButtons.forEach(button => {
            const accordionItem = button.closest('.accordion-item');
            if (!accordionItem.contains(event.target)) {
                const accordionContent = accordionItem.querySelector('.accordion-content');
                if (button.getAttribute('aria-expanded') === 'true') {
                    button.setAttribute('aria-expanded', 'false');
                    accordionContent.classList.remove('active');
                }
            }
        });
    });

});
