export const OkResponse = (message: string, statusCode: any, data?: any) => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };