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
        #region ISuit

        public Suit Suit { get; set; }

        #endregion


        #region IBody

        public IBody IBody
        {
            get { return this; }
        }

        public Point Position { get; set; }
        public double Size { get; set; }

        #endregion


        #region Protected

        protected GameObjectModel ToGameObjectModel()
        {
            return new GameObjectModel {
                Id = IIdentifiable.Id,
                Suit = Suit.ToString(),
                Position = IBody.Position.Model,
                Size = IBody.Size
            };
        }

        #endregion
    }
}