import daisyui from 'daisyui'

export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'bg-primary': 'var(--color-bg-primary)',
                'bg-secondary': 'var(--color-bg-secondary)',
                'card': 'var(--color-bg-card)',
                'border-custom': 'var(--color-border)',

                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-muted': 'var(--color-text-muted)',

                'primary': 'var(--color-primary)',
                'primary-hover': 'var(--color-primary-hover)',
                'primary-light': 'var(--color-primary-light)',
                'secondary': 'var(--color-secondary)',
                'secondary-hover': 'var(--color-secondary-hover)',
                'accent': 'var(--color-accent)',
                'accent-hover': 'var(--color-accent-hover)',

                'success': 'var(--color-success)',
                'warning': 'var(--color-warning)',
                'danger': 'var(--color-danger)',
                'info': 'var(--color-info)',
            },
            backgroundImage: {
                'gradient-primary': 'var(--gradient-primary)',
                'gradient-accent': 'var(--gradient-accent)',
            },
            boxShadow: {
                'light': 'var(--shadow-light)',
                'medium': 'var(--shadow-medium)',
                'heavy': 'var(--shadow-heavy)',
            }
        },
    },
    plugins: [daisyui], 
    daisyui: {
        themes: ["dark", "light"], 
    }
}