CREATE TABLE [adm].[Perfil] (
    [Id]          INT             IDENTITY (1, 1) NOT NULL,
    [PerfilName]  VARCHAR (256)   NOT NULL,
    [Description] NVARCHAR (2000) NOT NULL,
    CONSTRAINT [PK_Perfil] PRIMARY KEY CLUSTERED ([Id] ASC)
);

