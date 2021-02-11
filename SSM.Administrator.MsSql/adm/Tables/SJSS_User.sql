CREATE TABLE [adm].[SJSS_User] (
    [Id]                INT              IDENTITY (1, 1) NOT NULL,
    [UserName]          VARCHAR (256)    NOT NULL,
    [Email]             VARCHAR (256)    NOT NULL,
    [PasswordHash]      NVARCHAR (MAX)   NOT NULL,
    [PhoneNumber]       VARCHAR (256)    NOT NULL,
    [JobTitle]          VARCHAR (256)    NOT NULL,
    [LoginName]         VARCHAR (254)    NULL,
    [IsActive]          BIT              NOT NULL,
    [IsMustChange]      BIT              NOT NULL,
    [CreatedOn]         DATETIME         NOT NULL,
    [LastUpdateOn]      DATETIME         NULL,
    [Salt]              UNIQUEIDENTIFIER NULL,
    [AccessFailedCount] INT              NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([Id] ASC)
);



