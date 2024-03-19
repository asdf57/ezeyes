import React from 'react';
import { DialogContainer, AlertDialog, Content, Well, Link } from '@adobe/react-spectrum';

interface ErrorModalProps {
    error: any,
    resetErrorBoundary: () => void
}

function buildEmail(error: any) {
    const MAX_SUBJECT_LENGTH = 78

    const address = 'ezeyes@drexel0.onmicrosoft.com'
    let subject = `[Crash Report] ${error.message}`
    if (subject.length > MAX_SUBJECT_LENGTH) { 
        subject = subject.slice(0,MAX_SUBJECT_LENGTH) + '…'
    }
    const body = `${error.stack}\n\n${window.navigator.userAgent}`
    
    const email = encodeURI(`mailto:${address}?subject=${subject}&body=${body}`)
    return email;
}

// TODO: develop error handling strategy for these: https://stackoverflow.com/a/57943193
function SystemErrorModal(props: ErrorModalProps) {
    return (
        (
            <DialogContainer onDismiss={props.resetErrorBoundary} type="modal" isDismissable>
            <AlertDialog 
                variant='error'
                title='EZEyes Broke'
                primaryActionLabel='Close'
                onPrimaryAction={props.resetErrorBoundary}>
                <Content>
                    <Link href={buildEmail(props.error)}>Send Bug Report</Link>
                    <Well>{props.error.message}</Well>
                </Content>
            </AlertDialog>
            </DialogContainer>
        )
    );
}

export default SystemErrorModal;
