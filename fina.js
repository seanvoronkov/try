// FINA Base Times (World Records as of 2023)
const baseTimesMen = {
    'freestyle': {
        '50': 20.91,
        '100': 46.86,
        '200': 102.00,
        '400': 220.07,
        '800': 452.12,
        '1500': 871.02
    },
    'backstroke': {
        '50': 23.71,
        '100': 51.60,
        '200': 111.92
    },
    'breaststroke': {
        '50': 25.95,
        '100': 56.88,
        '200': 126.12
    },
    'butterfly': {
        '50': 22.27,
        '100': 49.45,
        '200': 110.73
    },
    'medley': {
        '200': 114.00,
        '400': 243.84
    }
};

const baseTimesWomen = {
    'freestyle': {
        '50': 23.67,
        '100': 51.71,
        '200': 112.98,
        '400': 236.46,
        '800': 484.79,
        '1500': 932.98
    },
    'backstroke': {
        '50': 26.98,
        '100': 57.45,
        '200': 123.35
    },
    'breaststroke': {
        '50': 29.16,
        '100': 64.13,
        '200': 139.11
    },
    'butterfly': {
        '50': 24.43,
        '100': 55.48,
        '200': 121.81
    },
    'medley': {
        '200': 126.12,
        '400': 266.36
    }
};

// Add to existing base times
const poolConversion = {
    'freestyle': {
        '50': 0.8,
        '100': 1.6,
        '200': 3.2,
        '400': 6.4,
        '800': 12.8,
        '1500': 24.0
    },
    // Add conversion times for other strokes...
};

// Add to the DOMContentLoaded event listener
// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const pointsDisplay = document.getElementById('points');
    const strokeSelect = document.getElementById('stroke');
    const distanceSelect = document.getElementById('distance');
    const genderSelect = document.getElementById('gender');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const millisecondsInput = document.getElementById('milliseconds');
    const poolLengthSelect = document.getElementById('poolLength');
    const targetPointsInput = document.getElementById('targetPoints');
    const calculateTargetBtn = document.getElementById('calculateTarget');
    const targetTimeDisplay = document.getElementById('targetTime');

    // Pool conversion factors (seconds to subtract for short course)
    const poolConversion = {
        'freestyle': {
            '50': 0.8,
            '100': 1.6,
            '200': 3.2,
            '400': 6.4,
            '800': 12.8,
            '1500': 24.0
        },
        'backstroke': {
            '50': 0.9,
            '100': 1.8,
            '200': 3.6
        },
        'breaststroke': {
            '50': 0.7,
            '100': 1.4,
            '200': 2.8
        },
        'butterfly': {
            '50': 0.8,
            '100': 1.6,
            '200': 3.2
        },
        'medley': {
            '200': 3.2,
            '400': 6.4
        }
    };

    // Update regular calculation to consider pool length
    calculateBtn.addEventListener('click', () => {
        const stroke = strokeSelect.value;
        const distance = distanceSelect.value;
        const gender = genderSelect.value;
        
        const minutes = parseInt(minutesInput.value || 0);
        const seconds = parseInt(secondsInput.value || 0);
        const milliseconds = parseInt(millisecondsInput.value || 0);
        
        const poolLength = poolLengthSelect.value;
        let timeInSeconds = minutes * 60 + seconds + milliseconds / 100;
        
        // Adjust time for pool length
        if (poolLength === 'short') {
            timeInSeconds -= poolConversion[stroke][distance];
        }
        
        const points = Math.round((baseTime / timeInSeconds) ** 3 * 1000);
        animatePoints(points);
    });

    // Calculate target time from points
    calculateTargetBtn.addEventListener('click', () => {
        const stroke = strokeSelect.value;
        const distance = distanceSelect.value;
        const gender = genderSelect.value;
        const poolLength = poolLengthSelect.value;
        const targetPoints = parseFloat(targetPointsInput.value);

        if (!targetPoints) return;

        const baseTime = gender === 'male' ? 
            baseTimesMen[stroke][distance] : 
            baseTimesWomen[stroke][distance];

        // Calculate target time using inverse FINA formula
        let targetTime = baseTime / Math.pow(targetPoints/1000, 1/3);
        
        // Adjust for pool length
        if (poolLength === 'short') {
            targetTime -= poolConversion[stroke][distance];
        }

        // Format time
        const minutes = Math.floor(targetTime / 60);
        const seconds = Math.floor(targetTime % 60);
        const milliseconds = Math.round((targetTime % 1) * 100);

        targetTimeDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    });

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all contents
            contents.forEach(content => content.classList.add('hidden'));
            // Show selected content
            const targetContent = document.getElementById(tab.dataset.tab + 'Calc');
            targetContent.classList.remove('hidden');
        });
    });

    // Sync selections between calculators
    const syncSelects = (sourceId, targetId) => {
        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);
        if (source && target) {
            target.value = source.value;
        }
    };

    // Sync when switching tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            syncSelects('stroke', 'targetStroke');
            syncSelects('distance', 'targetDistance');
            syncSelects('gender', 'targetGender');
            syncSelects('poolLength', 'targetPoolLength');
        });
    });
});