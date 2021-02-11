CREATE TABLE [adm].[PerfilTransaction] (
    [Id]            INT IDENTITY (1, 1) NOT NULL,
    [IdPerfil]      INT NOT NULL,
    [IdTransaction] INT NOT NULL,
    CONSTRAINT [PK_PerfilTransaction] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Fk_PerfilTransaction_Perfil] FOREIGN KEY ([IdPerfil]) REFERENCES [adm].[Perfil] ([Id]),
    CONSTRAINT [Fk_PerfilTransaction_Transaction] FOREIGN KEY ([IdTransaction]) REFERENCES [adm].[Transaction] ([Id]),
    CONSTRAINT [UK_PerfilTransaction] UNIQUE NONCLUSTERED ([IdPerfil] ASC, [IdTransaction] ASC)
);

