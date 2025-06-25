// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animated counter for statistics
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.about-stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });

    // Hero chart animation
    const canvas = document.getElementById('heroChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Chart data
    const data = [65, 78, 45, 88, 92, 67, 85, 73, 95, 82];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    
    let animationProgress = 0;
    const animationDuration = 2000; // 2 seconds
    let startTime = null;

    function drawChart(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;
        const barWidth = chartWidth / data.length;
        const maxValue = Math.max(...data);

        // Draw bars
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight * progress;
            const x = padding + index * barWidth + barWidth * 0.2;
            const y = canvas.height - padding - barHeight;
            const width = barWidth * 0.6;

            // Create gradient
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');

            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, width, barHeight);

            // Draw labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + width / 2, canvas.height - padding + 20);
        });

        // Draw axes
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
    }

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        animationProgress = Math.min(elapsed / animationDuration, 1);

        drawChart(animationProgress);

        if (animationProgress < 1) {
            requestAnimationFrame(animate);
        }
    }

    // Start animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(animate);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    heroObserver.observe(heroSection);

    // Parallax effect for background shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        const orbs = document.querySelectorAll('.orb');

        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.05);
            orb.style.transform = `translate(${Math.sin(scrolled * 0.001) * 20}px, ${scrolled * speed}px)`;
        });
    });

    // Data Playground Functionality
    let playgroundData = [];
    let currentChart = null;
    
    const playgroundCanvas = document.getElementById('playgroundChart');
    const playgroundCtx = playgroundCanvas.getContext('2d');
    
    // Set canvas size
    playgroundCanvas.width = 600;
    playgroundCanvas.height = 400;

    // Color themes
    const colorThemes = {
        blue: ['#667eea', '#764ba2'],
        purple: ['#a855f7', '#ec4899'],
        green: ['#10b981', '#059669'],
        orange: ['#f59e0b', '#ea580c'],
        red: ['#ef4444', '#dc2626']
    };

    // Sample data sets
    const sampleData = {
        sales: [
            { label: 'Q1', value: 45000 },
            { label: 'Q2', value: 52000 },
            { label: 'Q3', value: 48000 },
            { label: 'Q4', value: 61000 }
        ],
        population: [
            { label: 'Asia', value: 4641 },
            { label: 'Africa', value: 1340 },
            { label: 'Europe', value: 747 },
            { label: 'N. America', value: 579 },
            { label: 'S. America', value: 430 },
            { label: 'Oceania', value: 45 }
        ],
        temperature: [
            { label: 'Jan', value: 2 },
            { label: 'Feb', value: 4 },
            { label: 'Mar', value: 8 },
            { label: 'Apr', value: 14 },
            { label: 'May', value: 20 },
            { label: 'Jun', value: 25 },
            { label: 'Jul', value: 28 },
            { label: 'Aug', value: 27 },
            { label: 'Sep', value: 22 },
            { label: 'Oct', value: 16 },
            { label: 'Nov', value: 9 },
            { label: 'Dec', value: 4 }
        ],
        revenue: [
            { label: 'Product A', value: 125000 },
            { label: 'Product B', value: 89000 },
            { label: 'Product C', value: 156000 },
            { label: 'Product D', value: 73000 },
            { label: 'Product E', value: 98000 }
        ]
    };

    // Input method switching
    const inputMethodBtns = document.querySelectorAll('.input-method-btn');
    const inputMethods = document.querySelectorAll('.input-method');

    inputMethodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            inputMethodBtns.forEach(b => b.classList.remove('active'));
            inputMethods.forEach(m => m.classList.remove('active'));
            
            this.classList.add('active');
            const method = this.getAttribute('data-method');
            document.getElementById(method + 'Input').classList.add('active');
        });
    });

    // Manual data input
    const dataEntry = document.querySelector('.data-entry');
    const addDataPointBtn = document.getElementById('addDataPoint');

    function createEntryRow(label = '', value = '') {
        const row = document.createElement('div');
        row.className = 'entry-row';
        row.innerHTML = `
            <input type="text" placeholder="Label" class="label-input" value="${label}">
            <input type="number" placeholder="Value" class="value-input" value="${value}">
            <button class="remove-btn">×</button>
        `;
        
        row.querySelector('.remove-btn').addEventListener('click', function() {
            if (dataEntry.children.length > 1) {
                row.remove();
            }
        });
        
        return row;
    }

    // Add initial rows
    for (let i = 0; i < 4; i++) {
        dataEntry.appendChild(createEntryRow());
    }

    addDataPointBtn.addEventListener('click', function() {
        dataEntry.appendChild(createEntryRow());
    });

    // Sample data buttons
    const sampleBtns = document.querySelectorAll('.sample-btn');
    sampleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sampleType = this.getAttribute('data-sample');
            playgroundData = [...sampleData[sampleType]];
            updateChart();
        });
    });

    // Random data generation
    const generateRandomBtn = document.getElementById('generateRandom');
    generateRandomBtn.addEventListener('click', function() {
        const count = parseInt(document.getElementById('randomCount').value);
        const minVal = parseInt(document.getElementById('minValue').value);
        const maxVal = parseInt(document.getElementById('maxValue').value);
        
        playgroundData = [];
        for (let i = 0; i < count; i++) {
            playgroundData.push({
                label: `Item ${i + 1}`,
                value: Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
            });
        }
        updateChart();
    });

    // Animation speed control
    const animationSpeedSlider = document.getElementById('animationSpeed');
    const speedValue = document.getElementById('speedValue');
    
    animationSpeedSlider.addEventListener('input', function() {
        const speed = this.value / 1000;
        speedValue.textContent = speed + 's';
    });

    // Update chart button
    const updateChartBtn = document.getElementById('updateChart');
    updateChartBtn.addEventListener('click', function() {
        // Get manual input data
        const rows = document.querySelectorAll('.entry-row');
        playgroundData = [];
        
        rows.forEach(row => {
            const label = row.querySelector('.label-input').value.trim();
            const value = parseFloat(row.querySelector('.value-input').value);
            
            if (label && !isNaN(value)) {
                playgroundData.push({ label, value });
            }
        });
        
        if (playgroundData.length > 0) {
            updateChart();
        } else {
            alert('Please enter at least one valid data point');
        }
    });

    // Export chart button
    const exportChartBtn = document.getElementById('exportChart');
    exportChartBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = playgroundCanvas.toDataURL();
        link.click();
    });

    // Chart drawing functions
    function drawBarChart(data, colors, progress = 1) {
        const padding = 60;
        const chartWidth = playgroundCanvas.width - padding * 2;
        const chartHeight = playgroundCanvas.height - padding * 2;
        const barWidth = chartWidth / data.length;
        const maxValue = Math.max(...data.map(d => d.value));

        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight * progress;
            const x = padding + index * barWidth + barWidth * 0.2;
            const y = playgroundCanvas.height - padding - barHeight;
            const width = barWidth * 0.6;

            // Create gradient
            const gradient = playgroundCtx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);

            playgroundCtx.fillStyle = gradient;
            playgroundCtx.fillRect(x, y, width, barHeight);

            // Draw labels
            playgroundCtx.fillStyle = '#666';
            playgroundCtx.font = '12px Inter';
            playgroundCtx.textAlign = 'center';
            playgroundCtx.fillText(item.label, x + width / 2, playgroundCanvas.height - padding + 20);
            
            // Draw values
            playgroundCtx.fillStyle = '#333';
            playgroundCtx.font = 'bold 10px Inter';
            playgroundCtx.fillText(item.value, x + width / 2, y - 5);
        });
    }

    function drawLineChart(data, colors, progress = 1) {
        const padding = 60;
        const chartWidth = playgroundCanvas.width - padding * 2;
        const chartHeight = playgroundCanvas.height - padding * 2;
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const valueRange = maxValue - minValue;

        // Draw line
        playgroundCtx.strokeStyle = colors[0];
        playgroundCtx.lineWidth = 3;
        playgroundCtx.beginPath();

        data.forEach((item, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((item.value - minValue) / valueRange) * chartHeight * progress;
            
            if (index === 0) {
                playgroundCtx.moveTo(x, y);
            } else {
                playgroundCtx.lineTo(x, y);
            }
        });
        playgroundCtx.stroke();

        // Draw points
        data.forEach((item, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((item.value - minValue) / valueRange) * chartHeight * progress;
            
            playgroundCtx.fillStyle = colors[1];
            playgroundCtx.beginPath();
            playgroundCtx.arc(x, y, 5, 0, Math.PI * 2);
            playgroundCtx.fill();

            // Draw labels
            playgroundCtx.fillStyle = '#666';
            playgroundCtx.font = '12px Inter';
            playgroundCtx.textAlign = 'center';
            playgroundCtx.fillText(item.label, x, playgroundCanvas.height - padding + 20);
        });
    }

    function drawPieChart(data, colors, progress = 1) {
        const centerX = playgroundCanvas.width / 2;
        const centerY = playgroundCanvas.height / 2;
        const radius = Math.min(centerX, centerY) - 80;
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        let currentAngle = -Math.PI / 2;
        
        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * Math.PI * 2 * progress;
            
            // Generate color variations
            const hue = (index * 360 / data.length) % 360;
            const color = `hsl(${hue}, 70%, 60%)`;
            
            playgroundCtx.fillStyle = color;
            playgroundCtx.beginPath();
            playgroundCtx.moveTo(centerX, centerY);
            playgroundCtx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            playgroundCtx.closePath();
            playgroundCtx.fill();
            
            // Draw labels
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
            
            playgroundCtx.fillStyle = '#333';
            playgroundCtx.font = '12px Inter';
            playgroundCtx.textAlign = 'center';
            playgroundCtx.fillText(item.label, labelX, labelY);
            playgroundCtx.fillText(`${((item.value / total) * 100).toFixed(1)}%`, labelX, labelY + 15);
            
            currentAngle += sliceAngle;
        });
    }

    function drawScatterPlot(data, colors, progress = 1) {
        const padding = 60;
        const chartWidth = playgroundCanvas.width - padding * 2;
        const chartHeight = playgroundCanvas.height - padding * 2;
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));

        data.forEach((item, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
            const size = 8 * progress;
            
            // Create gradient
            const gradient = playgroundCtx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(1, colors[1]);
            
            playgroundCtx.fillStyle = gradient;
            playgroundCtx.beginPath();
            playgroundCtx.arc(x, y, size, 0, Math.PI * 2);
            playgroundCtx.fill();

            // Draw labels
            playgroundCtx.fillStyle = '#666';
            playgroundCtx.font = '10px Inter';
            playgroundCtx.textAlign = 'center';
            playgroundCtx.fillText(item.label, x, playgroundCanvas.height - padding + 20);
        });
    }

    function updateChart() {
        if (playgroundData.length === 0) return;

        const chartType = document.getElementById('chartType').value;
        const colorTheme = document.getElementById('chartColor').value;
        const animationSpeed = parseInt(document.getElementById('animationSpeed').value);
        const colors = colorThemes[colorTheme];

        // Update chart info
        const values = playgroundData.map(d => d.value);
        document.getElementById('dataCount').textContent = playgroundData.length;
        document.getElementById('maxVal').textContent = Math.max(...values).toLocaleString();
        document.getElementById('minVal').textContent = Math.min(...values).toLocaleString();
        document.getElementById('avgVal').textContent = Math.round(values.reduce((a, b) => a + b, 0) / values.length).toLocaleString();

        // Animate chart
        let progress = 0;
        const startTime = Date.now();

        function animateChart() {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / animationSpeed, 1);

            playgroundCtx.clearRect(0, 0, playgroundCanvas.width, playgroundCanvas.height);

            // Draw axes for bar and line charts
            if (chartType === 'bar' || chartType === 'line' || chartType === 'scatter') {
                playgroundCtx.strokeStyle = '#e2e8f0';
                playgroundCtx.lineWidth = 2;
                playgroundCtx.beginPath();
                playgroundCtx.moveTo(60, 60);
                playgroundCtx.lineTo(60, playgroundCanvas.height - 60);
                playgroundCtx.lineTo(playgroundCanvas.width - 60, playgroundCanvas.height - 60);
                playgroundCtx.stroke();
            }

            // Draw chart based on type
            switch (chartType) {
                case 'bar':
                    drawBarChart(playgroundData, colors, progress);
                    break;
                case 'line':
                    drawLineChart(playgroundData, colors, progress);
                    break;
                case 'pie':
                    drawPieChart(playgroundData, colors, progress);
                    break;
                case 'scatter':
                    drawScatterPlot(playgroundData, colors, progress);
                    break;
            }

            if (progress < 1) {
                requestAnimationFrame(animateChart);
            }
        }

        animateChart();
    }

    // Initialize with sample data
    playgroundData = [...sampleData.sales];
    updateChart();
});

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = document.querySelectorAll('.skill-item, .stat-item, .portfolio-item, .contact-item');
    
    elementsToReveal.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});