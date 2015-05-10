// Celler (c) 2015 Krokodev
// Celler.App.Web
// GameObject.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Abstract
{
    public abstract class GameObject<T> : Entity< T >, IBody, ISuit
    {
        #region Ctor

        protected GameObject( Suit suit, Point position, double size )
        {
            ISuit.Suit = suit;
            IBody.Position = position;
            IBody.Size = size;
        }

        #endregion


        #region ISuit

        protected ISuit ISuit
        {
            get { return this; }
        }

        Suit ISuit.Suit { get; set; }

        #endregion


        #region IBody

        public IBody IBody
        {
            get { return this; }
        }

        Point IBody.Position { get; set; }
        double IBody.Size { get; set; }

        #endregion


        #region Protected

        protected GameObjectModel ToGameObjectModel()
        {
            return new GameObjectModel {
                Id = IIdentifiable.Id,
                Suit = ISuit.Suit.ToString(),
                Position = IBody.Position.Model,
                Size = IBody.Size
            };
        }

        #endregion
    }
}