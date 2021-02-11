CREATE TABLE [adm].[Transaction] (
    [Id]              INT             IDENTITY (1, 1) NOT NULL,
    [ShortName]       VARCHAR (256)   NOT NULL,
    [TypeTransaction] VARCHAR (1)     NOT NULL,
    [Description]     NVARCHAR (2000) NOT NULL,
    CONSTRAINT [PK_Transaction] PRIMARY KEY CLUSTERED ([Id] ASC)
);

