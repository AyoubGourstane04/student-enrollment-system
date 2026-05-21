
export const Footer = () => {
    const currenYear = new Date().getFullYear();
    return (
        <footer className="w-full py-6 mt-auto text-center border-t border-border/30">
            <p className="text-xs sm:text-sm text-muted-foreground">
                © {new Date().getFullYear()} Enrollment System. All rights reserved.
            </p>
        </footer>
    )
}; 