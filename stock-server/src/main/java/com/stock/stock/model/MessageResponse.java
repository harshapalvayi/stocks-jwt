package com.stock.stock.model;

public class MessageResponse {
    private String message;
    private Status status;

    public MessageResponse() {
    }

    public MessageResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public static MessageResponse success() {
        MessageResponse success = new MessageResponse();
        success.setStatus(Status.SUCCESS);
        return success;
    }

    public static MessageResponse failure() {
        MessageResponse failure = new MessageResponse();
        failure.setStatus(Status.FAILURE);
        return failure;
    }

    public static MessageResponse failure(Exception e) {
        MessageResponse failure = new MessageResponse();
        failure.setStatus(Status.FAILURE);
        failure.setMessage(e.getMessage());
        return failure;
    }
}
