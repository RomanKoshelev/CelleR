// Celler (c) 2015 Krokodev
// Celler.App.Web
// ConnectionMapping.cs

using System.Collections.Generic;
using System.Linq;

namespace Celler.App.Web.Hubs.ChatHub
{
    public class ConnectionMapping<T>
    {
        private readonly Dictionary< T, HashSet< string > > _connections =
            new Dictionary< T, HashSet< string > >();

        public int Count
        {
            get { return _connections.Count; }
        }

        public void Add( T key, string connectionId )
        {
            lock( _connections ) {
                HashSet< string > connections;
                if( !_connections.TryGetValue( key, out connections ) ) {
                    connections = new HashSet< string >();
                    _connections.Add( key, connections );
                }

                lock( connections ) {
                    connections.Add( connectionId );
                }
            }
        }

        public IEnumerable< string > GetConnections( T key )
        {
            lock( _connections ) {
                HashSet< string > connections;
                if( _connections.TryGetValue( key, out connections ) ) {
                    return connections;
                }

                return Enumerable.Empty< string >();
            }
        }

        public void Remove( T key, string connectionId )
        {
            lock( _connections ) {
                HashSet< string > connections;
                if( !_connections.TryGetValue( key, out connections ) ) {
                    return;
                }

                lock( connections ) {
                    connections.Remove( connectionId );

                    if( connections.Count == 0 ) {
                        _connections.Remove( key );
                    }
                }
            }
        }

        public List< T > GetIds()
        {
            return _connections.Keys.ToList();
        }
    }
}