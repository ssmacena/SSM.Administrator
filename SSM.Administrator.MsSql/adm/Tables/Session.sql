CREATE TABLE [adm].[Session] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [SessionCode]  VARCHAR (2000) NOT NULL,
    [Login]        VARCHAR (254)  NULL,
    [CreatedOn]    DATETIME       NOT NULL,
    [CreatedBy]    VARCHAR (254)  NOT NULL,
    [LastUpdateOn] DATETIME       NULL,
    [LastUpdateBy] VARCHAR (254)  NULL,
    [Active]       BIT            NOT NULL,
    CONSTRAINT [PK_Session] PRIMARY KEY CLUSTERED ([Id] ASC)
);

