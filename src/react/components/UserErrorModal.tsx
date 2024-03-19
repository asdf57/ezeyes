import React from 'react';
import { DialogContainer, AlertDialog, Content, Well } from '@adobe/react-spectrum';

interface ErrorModalProps {
    error: any,
    resetErrorBoundary: () => void
}

function UserErrorModal(props: ErrorModalProps) {
    return (
        (
            <DialogContainer onDismiss={props.resetErrorBoundary} type="modal" isDismissable>
            <AlertDialog 
                variant='error'
                title='Invalid Input'
                primaryActionLabel='Retry'
                onPrimaryAction={props.resetErrorBoundary}>
                <Content>
                    <Well>{props.error.message}</Well>
                </Content>
            </AlertDialog>
            </DialogContainer>
        )
    );
}

export default UserErrorModal;
