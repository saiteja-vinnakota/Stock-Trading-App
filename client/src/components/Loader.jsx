function Loader() {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
            <div
                className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"
                role="status"
                aria-label="Loading"
            />
        </div>
    );
}

export default Loader;