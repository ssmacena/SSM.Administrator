
CREATE PROCEDURE [adm].[SPR_ADD_USER]
    @pUserName varchar(256),
    @pEmail varchar(256),
    @pPassword nvarchar(max),
    @pPhoneNumber varchar(256),
    @pJobTitle varchar(256),
    @pLogin varchar(254),
    @responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

    DECLARE @Salt UNIQUEIDENTIFIER=NEWID()
    BEGIN TRY

		INSERT INTO [adm].[User]
				   ([UserName]
				   ,[Email]
				   ,[PasswordHash]
				   ,[PhoneNumber]
				   ,[JobTitle]
				   ,[Login]
				   ,[IsActive]
				   ,[IsMustChange]
				   ,[CreatedOn]
				   ,[LastUpdateOn]
				   ,[Salt]
				   ,[AccessFailedCount])
			 VALUES
				   (@pUserName
				   ,@pEmail
				   ,HASHBYTES('SHA2_512', @pPassword+CAST(@salt AS NVARCHAR(36)))
				   ,@pPhoneNumber
				   ,@pJobTitle
				   ,@pLogin
				   ,1
				   ,1
				   ,GETDATE()
				   ,null
				   ,@Salt
				   ,0)

        SET @responseMessage='Success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE() 
    END CATCH

END