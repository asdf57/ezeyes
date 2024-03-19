import { useErrorBoundary } from 'react-error-boundary';

const useErrorCapture = () => {
    const { showBoundary } = useErrorBoundary();

    const captureError = (work: () => void, cleanup?: () => void) => {
        try {
            work()
        } catch(e) {
            showBoundary(e)
        } finally {
            if (cleanup) 
                cleanup()
        }
    }

    return { captureError }
};

export default useErrorCapture;
