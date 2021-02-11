
CREATE PROCEDURE [adm].[SPR_CHECK_LOGIN]
    @pLoginName varchar(254),
    @pPassword nvarchar(max),
    @responseMessage NVARCHAR(250) OUTPUT
AS
BEGIN
    SET NOCOUNT ON

    DECLARE @userID INT

    IF EXISTS (SELECT TOP 1 Id FROM [adm].[User] WHERE LoginName=@pLoginName)
    BEGIN
        SET @userID=(SELECT Id FROM [adm].[User] WHERE LoginName=@pLoginName AND PasswordHash=HASHBYTES('SHA2_512', @pPassword+CAST(Salt AS NVARCHAR(36))))

       IF(@userID IS NULL)
           SET @responseMessage='Incorrect password'
       ELSE 
           SET @responseMessage='User successfully logged in'
    END
    ELSE
       SET @responseMessage='Invalid login'

END