CREATE TABLE [adm].[UserPerfil] (
    [Id]       INT IDENTITY (1, 1) NOT NULL,
    [IdUser]   INT NOT NULL,
    [IdPerfil] INT NOT NULL,
    CONSTRAINT [PK_UserPerfil] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Fk_UserPerfil_Perfil] FOREIGN KEY ([IdPerfil]) REFERENCES [adm].[Perfil] ([Id]),
    CONSTRAINT [Fk_UserPerfil_User] FOREIGN KEY ([IdUser]) REFERENCES [adm].[SJSS_User] ([Id]),
    CONSTRAINT [UK_UserPerfil] UNIQUE NONCLUSTERED ([IdUser] ASC, [IdPerfil] ASC)
);

