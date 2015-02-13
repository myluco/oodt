/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.oodt.cas.filemgr.ingest;

/**
 * @author mattmann
 * @version $Revision$
 * 
 * <p>
 * A Factory class for creating {@link Cache}s
 * </p>.
 */
public interface CacheFactory {

    /**
     * Create a new {@link Cache}.
     * 
     * @return A new {@link Cache}, constructed by the implementing Factory.
     * @throws InstantiationException If the the particular {@link Cache} can
     * not be created for some reason.
     */
    public Cache createCache() throws InstantiationException;

}
